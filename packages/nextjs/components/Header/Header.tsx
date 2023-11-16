import * as React from "react";
import Link from "next/link";
import { Button, useCart, Header as BaseHeader } from "shared-ui";
import { Search } from "components/Search";
import { useRouter } from "next/router";

export const Header = () => {
  const { toggleCartOpen } = useCart();
  const { pathname } = useRouter();

  return (
    <BaseHeader
      LinkElement={Link}
      ProductListLink={
        <Link href="/products" passHref legacyBehavior>
          <Button as="a" variant="secondary" onClick={() => toggleCartOpen(false)}>
            View Products
          </Button>
        </Link>
      }
      currentRoute={pathname}
    >
      <Search />
    </BaseHeader>
  );
};
