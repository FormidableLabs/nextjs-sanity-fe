import type { Meta, StoryObj } from "../../../.storybook/types";
import { Button } from "../../Button/Button";
import { MobileNavMenu } from "../../MobileNav";
import { Cart, CartContent } from "../../cart";
import { DesktopNavItem } from "../DesktopNavItem";
import { Header } from "../Header";
import { Logo } from "../Logo";
import { NAV_ITEMS } from "../NavItems";

const meta: Meta<typeof Header> = {
  component: Header,
  title: "Header",
};

export default meta;

type Story = StoryObj<typeof Header>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onMobileNavClose = () => {};

export const Default: Story = {
  render: () => (
    <Header currentRoute="/products">
      <div className="flex items-center">
        <a href="/" onClick={onMobileNavClose}>
          <Logo className="w-24" />
        </a>
        <ul className="ml-8 hidden sm:flex sm:flex-1">
          {NAV_ITEMS.map(({ href, label }) => (
            <DesktopNavItem isActive={"/products" === href} key={`${href}-${label}`} href={href} label={label} />
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        <Cart onMobileNavClose={onMobileNavClose}>
          <CartContent
            ProductListLink={
              <a href="/products">
                <Button as="a" variant="secondary" onClick={() => toggleCartOpen(false)}>
                  View Products
                </Button>
              </a>
            }
          />
        </Cart>
        <MobileNavMenu />
      </div>
    </Header>
  ),
};
