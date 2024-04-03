import { Toaster } from "react-hot-toast";
import { AppWrapper } from "./ClientSideComponent/context";
import { ChakraUIProvider } from "./ClientSideComponent/ChakraUIProvider";
import "./globals.css";
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
          <ChakraUIProvider>{children}</ChakraUIProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
