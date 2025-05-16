import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { logout } from "../redux/reducers/userReducer";

const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
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
            const submenu = dropdown.querySelector(".sidebar-submenu");
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

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type="button"
          className="sidebar-close-btn"
        >
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link to="/" className="sidebar-logo">
            <img
              src="/assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="/assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="/assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </Link>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            <li>
              <NavLink
                to="/Dashboard"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="menu-icon"
                />
                <span>Início</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="#">
                <Icon
                  icon="mdi:clipboard-text-clock-outline"
                  className="menu-icon"
                />
                <span>Vendas</span>
              </NavLink>
            </li>

            <li className="dropdown">
              <Link to="#">
                <Icon icon="mdi:package-variant-closed" className="menu-icon" />
                <span>Produtos</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/products/register"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                    Cadastrar produto
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products/products"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                    Meus produtos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products/affiliates"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                    Produtos afiliados
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/store/store-products"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:store-outline" className="menu-icon" />
                <span>Loja</span>
              </NavLink>
            </li>

            <li className="dropdown">
              <Link to="#">
                <Icon
                  icon="mdi:account-multiple-outline"
                  className="menu-icon"
                />
                <span>Afiliados</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/affiliate/my-affiliate-products"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-success-main w-auto" />
                    Minhas solicitações
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/affiliate/affiliates-of-my-products"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-danger-main w-auto" />
                    Meus afiliados
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="#">
                <Icon icon="mdi:truck-fast-outline" className="menu-icon" />
                <span>Entregas</span>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <NavLink
                    to="/entregas/pendentes"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                    Pendentes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/entregas/encaminhadas"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                    Encaminhadas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/entregas/finalizadas"
                    className={(navData) =>
                      navData.isActive ? "active-page" : ""
                    }
                  >
                    <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                    Finalizadas
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/relatorios"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:chart-box-outline" className="menu-icon" />
                <span>Relatórios</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/financeiro"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:currency-usd" className="menu-icon" />
                <span>Financeiro</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/bancos"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:bank-outline" className="menu-icon" />
                <span>Bancos</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/mensagens"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:message-text-outline" className="menu-icon" />
                <span>Mensagens</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ferramentas"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:tools" className="menu-icon" />
                <span>Ferramentas</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/configuracoes"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:cog-outline" className="menu-icon" />
                <span>Configurações</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/integracoes"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:puzzle-outline" className="menu-icon" />
                <span>Integrações</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/crm"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:account-tie-outline" className="menu-icon" />
                <span>CRM</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/equipe"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:account-group-outline" className="menu-icon" />
                <span>Equipe</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/fretes"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:truck-outline" className="menu-icon" />
                <span>Fretes</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/taxas"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:trophy-outline" className="menu-icon" />
                <span>Taxas</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/premiacoes"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:trophy-outline" className="menu-icon" />
                <span>Premiações</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blog"
                className={(navData) => (navData.isActive ? "active-page" : "")}
              >
                <Icon icon="mdi:blogger" className="menu-icon" />
                <span>Blog</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <main className={sidebarActive ? "dashboard-main active" : "dashboard-main"}>
        <div className="navbar-header">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-4">
                <button type="button" className="sidebar-toggle" onClick={sidebarControl}>
                  {sidebarActive ? (
                    <Icon icon="iconoir:arrow-right" className="icon text-2xl non-active" />
                  ) : (
                    <Icon icon="heroicons:bars-3-solid" className="icon text-2xl non-active" />
                  )}
                </button>
                <button onClick={mobileMenuControl} type="button" className="sidebar-mobile-toggle">
                  <Icon icon="heroicons:bars-3-solid" className="icon" />
                </button>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <ThemeToggleButton />

                <div className="dropdown">
                  <button
                    className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <Icon icon="iconoir:bell" className="text-primary-light text-xl" />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-lg p-3">
                    <p className="mb-0 text-center text-sm text-secondary-light">Nenhuma notificação disponível.</p>
                  </div>
                </div>

                <div className="dropdown">
                  <button
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src="/assets/images/user.png"
                      alt="image_user"
                      className="w-40-px h-40-px object-fit-cover rounded-circle"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-2">Usuário</h6>
                      </div>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <Link className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3" to="/view-profile">
                          <Icon icon="solar:user-linear" className="icon text-xl" /> Meus Dados
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3" to="#" onClick={handleLogout}>
                          <Icon icon="lucide:power" className="icon text-xl" /> Sair do sistema
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-main-body">{children}</div>

        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">© 2024 Pagmus. Todos os direitos reservados.</p>
            </div>
            <div className="col-auto">
              <p className="mb-0">
                Desenvolvido por <span className="text-primary-600">Spark Mobile</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
