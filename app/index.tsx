import { Redirect } from 'expo-router';

export default function StartPage() {
    // This component will automatically redirect to the /login route.
    return <Redirect href="/login" />;
}