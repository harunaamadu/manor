import Link from "next/link";
import Container from "@/components/common/Container";
import { ClientOnly } from "@/components/common/OnlyClient";
import Logo from "../ui/logo";
import Navlinks from "./Navlinks";
import NavActions from "./NavActions";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <ClientOnly>
      <Container
        as="header"
        className="sticky top-0 z-50000000 flex-row items-center justify-between border-b border-border bg-background/90 py-4 supports-backdrop-blur:backdrop-blur sm:py-5 lg:py-6"
      >
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <Navlinks navItems={navItems} />

        <NavActions />
      </Container>
    </ClientOnly>
  );
};

export default Header;
