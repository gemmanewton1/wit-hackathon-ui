'use server'

import Customer from "../../../lib/models/Customer";

interface CustomerType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

interface NewCustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}


export async function addCustomer(input : NewCustomerInput): Promise<CustomerType> {

const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'dateOfBirth'];

  for (const field of requiredFields) {
    if (!input[field as keyof NewCustomerInput]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }


  const customer = await Customer.create(input);

  return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      dateOfBirth: customer.dateOfBirth,

  };
}


export async function getCustomers(): Promise<CustomerType[]> {
  const customers = await Customer.find({});

  return customers.map((customer) => ({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      dateOfBirth: customer.dateOfBirth,
  }));
}

export async function deleteCustomer(customerId: string){

  if (!customerId) throw new Error("Customer ID is required");

  await Customer.findByIdAndDelete(customerId)
}


