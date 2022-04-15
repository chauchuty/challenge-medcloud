class Patient {
  id: number;
  name: string;
  birth_date: Date;
  email: string;
  address: string;

  constructor(
    id: number,
    name: string,
    birth_date: Date,
    email: string,
    address: string
  ) {
    this.id = id;
    this.name = name;
    this.birth_date = new Date(birth_date);
    this.email = email;
    this.address = address;
  }
}

export default Patient;
