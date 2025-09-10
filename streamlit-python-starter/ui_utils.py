import streamlit as st
import pandas as pd
import altair as alt

from datetime import datetime

def entry_row(row):
    cols = st.columns([1, 1, 1, 1, 0.5, 0.5])
    cols[0].write(row['product_name'])
    cols[1].write(f"${row['price']:.2f}")
    cols[2].write(row['timestamp'])
    edit_btn = cols[4].button("✏️ Edit", key=f"edit_{row['id']}")
    del_btn = cols[5].button("🗑️ Delete", key=f"del_{row['id']}")
    return edit_btn, del_btn

def edit_form(row):
    with st.form(f"edit_form_{row['id']}"):
        new_product_name = st.text_input("Product name", value=row['product_name'])
        new_price = st.number_input("Price", min_value=0.0, step=0.01, value=row['price'], format="%.2f")
        date_part, time_part = row['timestamp'].split(" ")
        new_date = st.date_input("Date", value=pd.to_datetime(date_part))
        new_time = st.time_input("Time", value=pd.to_datetime(time_part).time())
        save_btn = st.form_submit_button("Save Changes")
        cancel_btn = st.form_submit_button("Cancel")
        if save_btn and new_product_name != "":
            new_ts = datetime.combine(new_date, new_time).strftime("%Y-%m-%d %H:%M:%S")
            return new_product_name, new_price, new_ts, True, False
        if cancel_btn:
            return None, None, None, False, True
    return None, None, None, False, False


def plot_prices(df, selected_products):
    plot_df = df[df['product_name'].isin(selected_products)].copy()
    plot_df['timestamp'] = pd.to_datetime(plot_df['timestamp'])

    if not plot_df.empty:
        chart = alt.Chart(plot_df).mark_line(point=True).encode(
            x='timestamp:T',
            y='price:Q',
            color='product_name:N',  # Different color for each product
            tooltip=['product_name', 'price', 'timestamp']
        ).properties(
            title="Product Prices Over Time"
        ).interactive()
        st.altair_chart(chart, use_container_width=True)