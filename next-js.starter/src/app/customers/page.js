import Customers from './Customers'
import { getCustomers } from './actions';

export default async function CustomersPage() {
  const customers = await getCustomers();
  return <Customers initialCustomers={customers} />;
}