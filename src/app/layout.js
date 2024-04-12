import { Toaster } from "react-hot-toast";
import { AppWrapper } from "./ClientSideComponent/Context";
import { ChakraUIProvider } from "./ClientSideComponent/ChakraUIProvider";
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const metadata = {
  title: "TODO App",
  description: "To-do app make by Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center" />
        <AppWrapper>
          <PrimeReactProvider>
            <ChakraUIProvider> {children}</ChakraUIProvider>
          </PrimeReactProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
