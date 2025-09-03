import sys
import asyncio
if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch
from fastapiproject.main import app

@pytest.fixture
def anyio_backend():
    return 'asyncio'

@pytest.fixture
def mock_db():
    mock_collection = AsyncMock()
    mock_collection.insert_one = AsyncMock(return_value=None)
    mock_collection.find = AsyncMock()
    mock_db = {"products": mock_collection}
    return mock_db

@pytest.mark.anyio
@patch("fastapiproject.routers.product_router.get_database")
async def test_create_product(mock_get_db, mock_db):
    mock_get_db.return_value = mock_db
    product_data = {
        "name": "John Doe",
        "price": 9.99
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/products", json=product_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == product_data["name"]
    assert "_id" in data

@pytest.mark.anyio
@patch("fastapiproject.routers.product_router.get_database")
async def test_get_all_product(mock_get_db, mock_db):
    product = [
        {"name": "Alice", "price": 1.0},
        {"name": "Bob", "price": 2.0}
    ]
    async def fake_find():
        for c in product:
            yield c
    mock_db["products"].find = fake_find
    mock_get_db.return_value = mock_db
    transport = ASGITransport(app=app)
    # Send GET request to retrieve all products
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/products")
    assert response.status_code == 200  # Expect HTTP 200 OK
    data = response.json()
    assert len(data) == 2  # Should return two products
    assert data[0]["name"] == "Alice"  # Check first product's name
    assert data[1]["name"] == "Bob"    # Check second product's name

# Test for successful product deletion via DELETE /product/{id}
@pytest.mark.anyio
@patch("fastapiproject.routers.product_router.get_database")
async def test_delete_product_success(mock_get_db, mock_db):
    # Simulate successful deletion (deleted_count = 1)
    mock_result = AsyncMock()
    mock_result.deleted_count = 1
    mock_db["products"].delete_one = AsyncMock(return_value=mock_result)
    mock_get_db.return_value = mock_db  # Patch DB connection
    transport = ASGITransport(app=app)
    # Send DELETE request for product with id '1'
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.delete("/products/507f1f77bcf86cd799439011")
    assert response.status_code == 204  # Expect HTTP 204 No Content

# Test for product not found during deletion via DELETE /product/{id}
@pytest.mark.anyio
@patch("fastapiproject.routers.product_router.get_database")
async def test_delete_product_not_found(mock_get_db, mock_db):
    # Simulate not found (deleted_count = 0)
    mock_result = AsyncMock()
    mock_result.deleted_count = 0
    mock_db["products"].delete_one = AsyncMock(return_value=mock_result)
    mock_get_db.return_value = mock_db  # Patch DB connection
    transport = ASGITransport(app=app)
    # Send DELETE request for non-existent product id '999'
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.delete("/products/507f1f77bcf86cd799439011")
    assert response.status_code == 404  # Expect HTTP 404 Not Found
    assert response.json()["detail"] == "Product not found"  # Check error message
