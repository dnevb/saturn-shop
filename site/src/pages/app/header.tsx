import { Icon } from "@iconify/react";
import * as Menu from "@radix-ui/react-popover";
import clsx from "clsx";
import { Logo, T } from "components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "states/auth";
import { currencyState } from "states/commerce";

const Mainheader = () => {
  const [currency, setcurrency] = useRecoilState(currencyState);
  const { user } = useRecoilValue(authState)!;
  const nav = useNavigate();

  return (
    <header className="py2 shadow z-1">
      <nav className={styles.container}>
        <Link to="/" className={styles.logolink}>
          <Logo className="h7  w10 text-brand" />
          <T size="h4" className="text-[#414040]">
            Saturn shop
          </T>
        </Link>
        <div className="flex items-center gap4">
          <select
            value={currency}
            onChange={(e) => setcurrency(e.target.value)}
            className={styles.currencies}
          >
            <option value="EUR">EUR</option>
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>
          <div className={styles.actions}>
            <Icon
              className={styles.icons}
              icon="fluent:shopping-bag-16-regular"
            />
            <div className={clsx(styles.badge)}>0</div>
          </div>

          <Menu.Root>
            <Menu.Trigger>
              <Icon
                className={styles.icons}
                icon="fluent:person-16-regular"
              />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Content align="end" className={styles.menu}>
                <div>
                  <p className="text-xl">
                    {user["first_name"]} {user["last_name"]}
                  </p>
                  <p className="text-gray-500 mb4">{user["email"]}</p>
                </div>
                {user["role"] == "admin" && (
                  <div
                    className={styles.menuitem}
                    onClick={() => nav("/admin")}
                  >
                    Admin panel
                  </div>
                )}

                <div
                  className={styles.menuitem}
                  onClick={() => nav("/logout")}
                >
                  Log out
                </div>
              </Menu.Content>
            </Menu.Portal>
          </Menu.Root>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  menu: "rounded-lg bg-white w50 shadow-lg z2 p4",
  menuitem: "hover:bg-gray-100 text-lg px4 py2 cursor-pointer rounded-lg",
  icons: "h6 w8 cursor-pointer text-[#414040]",
  container: "lg:max-w-7xl mxauto flex items-center justify-between",
  logolink: "flex gap4 items-center select-none",
  shopicon: "relative inline-flex items-center",
  currencies:
    "bg-transparent text-[#414040] text-sm outline-none cursor-pointer",
  actions: "relative inline-flex items-center cursor-pointer",
  badge: [
    "absolute inline-flex items-center justify-center w-5 h-5 text-xs",
    "font-bold text-white bg-brand border-2 border-white rounded-full",
    "-top-2 -right-2",
  ],
};

export default Mainheader;
