import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Logo, T } from "components";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currencyState } from "states/commerce";

const Mainheader = () => {
  const [currency, setcurrency] = useRecoilState(currencyState);

  return (
    <header className="py2 shadow-lg">
      <nav className={styles.container}>
        <Link to="/" className={styles.logolink}>
          <Logo className="h10 w10 text-brand" />
          <T size="h3">Saturn shop</T>
        </Link>
        <div className="flex items-center gap4">
          <select
            value={currency}
            onChange={(e) => setcurrency(e.target.value)}
            className="bg-transparent text-lg outline-none cursor-pointer"
          >
            <option value="EUR">EUR</option>
            <option value="COP">COP</option>
            <option value="USD">USD</option>
          </select>
          <div className="relative inline-flex items-center cursor-pointer">
            <Icon
              className={styles.icons}
              icon="fluent:shopping-bag-16-regular"
            />
            <div className={clsx(styles.badge)}>0</div>
          </div>
          <Icon className={styles.icons} icon="fluent:person-16-regular" />
        </div>
      </nav>
    </header>
  );
};

const styles = {
  icons: "h8 w8 cursor-pointer",
  container: "lg:max-w-7xl mxauto flex items-center justify-between",
  logolink: "flex gap4 items-center select-none",
  shopicon: "relative inline-flex items-center",
  badge: [
    "absolute inline-flex items-center justify-center w-6 h-6 text-xs",
    "font-bold text-white bg-brand border-2 border-white rounded-full",
    "-top-2 -right-2",
  ],
};

export default Mainheader;
