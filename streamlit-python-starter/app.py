import streamlit as st
import pandas as pd
from datetime import datetime
from data_utils import load_data, add_entry, edit_entry, delete_entry
from ui_utils import entry_row, edit_form, plot_prices

st.set_page_config(page_title="Supermarket Price Tracker", layout="wide")
st.title("🛒 Supermarket Price Tracking Dashboard")

# Initialise session state to track which row is currently being edited
if "edit_row_id" not in st.session_state:
    st.session_state.edit_row_id = None

# Load the product price data from CSV into a DataFrame
df = load_data()

# --- Add Entry ---
# Sidebar section to add a new product price entry
st.sidebar.header("Add New Price Entry")
with st.sidebar.form(key="add_entry_form"):
    # Widget for user to input product name (text)
    product_name = st.text_input("Product name")
    # Widget for user to input product price (number)
    price = st.number_input("Price", min_value=0.0, step=0.01, format="%.2f")
    # Widgets for user to select the date and time for the price entry
    timestamp = st.date_input("Date", value=datetime.today())
    time_input = st.time_input("Time", value=datetime.now().time())
    # Form submission button; only active when pressed
    submit_entry = st.form_submit_button("Add Price Entry")
# On form submission, actually add the new entry to CSV and rerun app
if submit_entry and product_name != "":
    ts = datetime.combine(timestamp, time_input).strftime("%Y-%m-%d %H:%M:%S")
    df = add_entry(product_name, price, ts) # Adds data, saves file
    st.sidebar.success("Entry added!")
    st.experimental_rerun()  # Rerun to show updated UI/data

# --- Edit / Delete Functionality ---
st.subheader("Edit or Delete Entries")
if not df.empty:
    # Iterate over each row: show edit and delete buttons beside each
    for idx, row in df.iterrows():
        edit_btn, del_btn = entry_row(row) # Gets two buttons for the row
        # If edit button is clicked, remember which row is being edited
        if edit_btn:
            st.session_state.edit_row_id = row['id']
            st.experimental_rerun()     # Rerun, so form for this row appears
        # If delete button is clicked, remove the row and rerun to update
        if del_btn:
            df = delete_entry(row['id'])
            st.warning("Entry deleted.")
            st.experimental_rerun()
    # After handling button clicks, check if a row is being edited
    if st.session_state.edit_row_id is not None:
        # Find the DataFrame row matching the session's edit_row_id
        row_to_edit = df[df['id'] == st.session_state.edit_row_id].iloc[0]
        # Display the edit form only for the selected row
        result = edit_form(row_to_edit)
        if result:
            new_product_name, new_price, new_ts, do_save, do_cancel = result
            # If Save is pressed, update CSV and exit edit mode
            if do_save:
                df = edit_entry(row_to_edit['id'], new_product_name, new_price, new_ts)
                st.success("Entry updated!")
                st.session_state.edit_row_id = None  # Close form after edit
                st.experimental_rerun()
            # If Cancel is pressed, exit edit mode
            elif do_cancel:
                st.session_state.edit_row_id = None  # Close form if cancelled
                st.experimental_rerun()
else:
    st.info("No entries yet.")

# --- Filtering and Plotting ---
st.subheader("Price Trends")
if not df.empty:
    # Get unique product names for filtering
    products = df['product_name'].unique().tolist()
    # Multiselect widget to choose which products to plot
    selected_products = st.multiselect("Select products to plot", products, default=products[:1])
    # Draw the time series chart(s) for chosen products
    if selected_products:
        plot_prices(df, selected_products)
else:
    st.info("Add entries to view price trends.")

# --- Data Table ---
st.subheader("All Entries")
if not df.empty:
    # Display all entries in a table, sorted by timestamp (latest first)
    st.dataframe(df[['id', 'product_name', 'price', 'timestamp']].sort_values('timestamp', ascending=False), use_container_width=True)