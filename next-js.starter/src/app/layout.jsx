import "./globals.css";
import "./styles/App.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="App">
          <header className="App-header">
            <Image src="/witLogo.png" className="App-logo" alt="logo" width={300} height={300} />
            <nav style={{ marginBottom: "2rem" }}>
              <Link href="/" style={{ margin: "0 10px", color: "#61dafb" }}>
                Home
              </Link>
              <Link
                href="/products"
                style={{ margin: "0 10px", color: "#61dafb" }}
              >
                Products
              </Link>
              <Link
                href="/customers"
                style={{ margin: "0 10px", color: "#61dafb" }}
              >
                Customers
              </Link>
            </nav>
            {children}
          </header>
        </div>
      </body>
    </html>
  );
}
