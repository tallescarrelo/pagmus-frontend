import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import CartWidget from "../components/checkout/CartWidget";
import { logout } from "../redux/reducers/userReducer";

interface MasterLayoutProps {
  children: ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState<boolean>(false);
  let [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleDropdownClick = (event: Event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget as HTMLElement;
      const clickedDropdown = clickedLink.closest(".dropdown") as HTMLElement;

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu") as HTMLElement;
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu") as HTMLElement;
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu") as HTMLElement;
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = (): void => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = (): void => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Link to="/dashboard">
              <img src="/assets/images/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="sidebar-toggler" onClick={sidebarControl}>
            <Icon icon="solar:menu-dots-bold" />
          </div>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <NavLink to="/dashboard">
                <Icon icon="solar:home-2-bold" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:box-bold" />
                <span>Produtos</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/products">Meus Produtos</NavLink>
                </li>
                <li>
                  <NavLink to="/products/register">Cadastrar Produto</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:shop-bold" />
                <span>Loja</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/store">Produtos</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:users-group-rounded-bold" />
                <span>Afiliados</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/affiliate">Meus Afiliados</NavLink>
                </li>
                <li>
                  <NavLink to="/affiliate/my-products">Produtos Afiliados</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:chart-2-bold" />
                <span>Vendas</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/sales/invoices">Faturas</NavLink>
                </li>
                <li>
                  <NavLink to="/sales/churn">Churn</NavLink>
                </li>
                <li>
                  <NavLink to="/sales/abandon">Abandono</NavLink>
                </li>
                <li>
                  <NavLink to="/sales/reversal">Estornos</NavLink>
                </li>
                <li>
                  <NavLink to="/sales/indicators">Indicadores</NavLink>
                </li>
                <li>
                  <NavLink to="/sales/after-pay">After Pay</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:delivery-bold" />
                <span>Entregas</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/delivery/pending">Pendentes</NavLink>
                </li>
                <li>
                  <NavLink to="/delivery/forwarded">Encaminhadas</NavLink>
                </li>
                <li>
                  <NavLink to="/delivery/completed">Concluídas</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:bank-bold" />
                <span>Financeiro</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/banks">Bancos</NavLink>
                </li>
                <li>
                  <NavLink to="/withdrawals">Saques</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#">
                <Icon icon="solar:widget-bold" />
                <span>Ferramentas</span>
                <Icon icon="solar:alt-arrow-down-bold" />
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink to="/tools/api">API</NavLink>
                </li>
                <li>
                  <NavLink to="/tools/freight">Frete</NavLink>
                </li>
                <li>
                  <NavLink to="/tools/postback">Postback</NavLink>
                </li>
                <li>
                  <NavLink to="/tools/team">Equipe</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/integration">
                <Icon icon="solar:integration-bold" />
                <span>Integração</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports">
                <Icon icon="solar:chart-bold" />
                <span>Relatórios</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* main content */}
      <main className="main-content">
        {/* header */}
        <header className="header">
          <div className="header-left">
            <div className="mobile-menu-toggler" onClick={mobileMenuControl}>
              <Icon icon="solar:menu-dots-bold" />
            </div>
            <div className="header-search">
              <input type="text" placeholder="Pesquisar..." />
              <Icon icon="solar:magnifer-bold" />
            </div>
          </div>
          <div className="header-right">
            <CartWidget />
            <ThemeToggleButton />
            <div className="header-user">
              <div className="dropdown">
                <button className="dropdown-toggle">
                  <img src="/assets/images/avatar.png" alt="avatar" />
                  <span>Usuário</span>
                  <Icon icon="solar:alt-arrow-down-bold" />
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile">Perfil</Link>
                  <button onClick={handleLogout}>Sair</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* content */}
        <div className="content">
          {children}
        </div>
      </main>
    </section>
  );
};

export default MasterLayout; 