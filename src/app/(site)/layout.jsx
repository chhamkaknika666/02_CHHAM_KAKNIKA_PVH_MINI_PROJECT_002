import FooterComponent from "../../components/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent";
import { auth } from "../auth";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }) {
  const session = await auth();

  return (
    <>
      <NavbarComponent session={session} />
      {children}
      <FooterComponent />
    </>
  );
}
