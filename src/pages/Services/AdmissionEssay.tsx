import { Helmet } from 'react-helmet-async';

export default function AdmissionEssay() {
    return (
        <>
            <Helmet>
                <title>Admission Essay Writing Service | Expert Application Help</title>
                <meta name="description" content="Professional admission essay writing service. Get expert help with your college application, personal statement, and SOP. Stand out and get admitted." />
            </Helmet>

            <div className="min-h-screen bg-white">
                <section className="py-24 text-center">
                    <h1 className="text-4xl font-bold mb-4">Admission Essay Writing</h1>
                    <p className="text-xl text-gray-600">Secure your future with a winning college application essay.</p>
                </section>
            </div>
        </>
    );
}
