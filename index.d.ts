interface ResponseInterface {
  results: ResultsEntity[] | null;
  info: Info;
}
interface ResultsEntity {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DobOrRegistered;
  registered: DobOrRegistered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}
interface Name {
  title: string;
  first: string;
  last: string;
}
interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
}
interface Street {
  number: number;
  name: string;
}
interface Coordinates {
  latitude: string;
  longitude: string;
}
interface Timezone {
  offset: string;
  description: string;
}
interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}
interface DobOrRegistered {
  date: string;
  age: number;
}
interface Id {
  name: string;
  value?: string | null;
}
interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}
