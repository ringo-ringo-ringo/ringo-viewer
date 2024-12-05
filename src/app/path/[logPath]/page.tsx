import MainPage from "@/app/page";

export default function Home({ params }: { params: { logPath: string } }) {
    return (
        <>
            <MainPage logPath={params.logPath}></MainPage>
        </>
    );
}
