import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme") || "dark";

        document.body.className = savedTheme;

    }, []);

    return <AppRoutes />;

}

export default App;