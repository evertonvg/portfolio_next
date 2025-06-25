import { getCountries } from '@/contents/getCountries';
import RegisterForm from './RegisterForm';

export default async function RegisterPage() {
    const countries = await getCountries();

    return <RegisterForm countries={countries} />;
}
