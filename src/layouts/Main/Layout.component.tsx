import React, { FunctionComponent, useReducer } from "react"
import { ThemeProvider } from "@material-ui/styles"
import {
  createMuiTheme,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import MenuIcon from "@material-ui/icons/Menu"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import SchoolIcon from "@material-ui/icons/SchoolOutlined"
import InfoIcon from "@material-ui/icons/InfoOutlined"
import ScheduleIcon from "@material-ui/icons/Schedule"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import NewReleasesIcon from "@material-ui/icons/NewReleasesOutlined"
import { Link } from "gatsby"

import { ReactComponent as Logo } from "@Vectors/logo.svg"

import styles from "./Layout.module.scss"
import "./global.css"
import useSiteMeta from "@Hooks/useSiteMeta"

const MENUS = [
  {
    text: "Начало",
    Icon: HomeIcon,
    to: "/",
  },
  {
    text: "За гимназията",
    Icon: InfoIcon,
    to: "/about/",
  },
  {
    text: "Новини",
    Icon: NewReleasesIcon,
    to: "/news/",
  },
  {
    text: "Колектив",
    Icon: SchoolIcon,
    to: "/collective/",
  },
  {
    text: "Програма",
    Icon: ScheduleIcon,
    to: "/schedule/",
  },
  {
    text: "Документи",
    Icon: BookmarkBorderIcon,
    to: "/documents/",
  },
]

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
  },
})

export interface DrawerState {
  isOpen: boolean
  lastPathname?: string
}

export type DrawerActionType = "TOGGLE" | "CLOSE" | "NAVIGATE"

export interface DrawerAction {
  type: DrawerActionType
  pathname: string
}

// When a drawer link initiates navigation via Gatsby's Link component, it
// needs some time to fetch its data. If the request resolves during
// transitioning the drawer to a closed state, the Layout component rerenders
// and thus the Transition component receives the following sequence of props:
// 1) open (before clicking a link)
// 2) closed (synchronous, as the link is clicked)
// 3) closed (async, when promise resolves)
//
// This ends the transition prematurely, which in turn results in flickering.
// To work around this issue, we keep the drawer open until the data resolves.
// As soon as it does, we check if current location (from props) is different
// from the previous location, stored in this reducer's state. Only then we
// fire the close transition and update the location for later navigations.
// To give feedback to the user that a navigation is in progress, we update the
// drawer to reflect future location.
function drawerReducer(state: DrawerState, action: DrawerAction): DrawerState {
  switch (action.type) {
    case "TOGGLE":
      return {
        isOpen: !state.isOpen,
        lastPathname: action.pathname,
      }
    case "CLOSE":
      return {
        isOpen: false,
        lastPathname: action.pathname,
      }
    case "NAVIGATE":
      return {
        isOpen: true,
        lastPathname: action.pathname,
      }
  }
}

export interface LayoutProps {
  location: { pathname: string }
}

const Layout: FunctionComponent<LayoutProps> = ({ children, location }) => {
  const [{ isOpen, lastPathname }, _dispatch] = useReducer(drawerReducer, {
    isOpen: false,
    lastPathname: location.pathname,
  })

  const dispatch = (type: DrawerActionType) =>
    _dispatch({ type, pathname: location.pathname })

  const toggleDrawer = () => dispatch("TOGGLE")
  const closeDrawer = () => dispatch("CLOSE")
  const navigateDrawer = () => dispatch("NAVIGATE")

  // Navigation completed successfully. Hide drawer
  if (lastPathname !== location.pathname) {
    closeDrawer()
  }

  const { schoolType, schoolName } = useSiteMeta()
  const showHeader = location.pathname === "/"

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            onClick={toggleDrawer}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          {!showHeader && (
            <Link to="/" className={styles.headerContainer + " " + styles.link}>
              <Typography variant="h6" color="inherit">
                {schoolType}&nbsp;
              </Typography>
              <Typography variant="h6" color="inherit">
                "{schoolName}"
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen} onClose={closeDrawer}>
        <Logo className={styles.logo} />
        <List>
          {MENUS.map(({ text, Icon, to }) => (
            <ListItem
              key={text}
              button
              component={Link}
              to={to}
              onClick={navigateDrawer}
              selected={to === lastPathname}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  className: styles.linkText,
                  variant: "h5",
                }}
              >
                {text}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={styles.children}>{children}</div>
    </ThemeProvider>
  )
}

export default Layout
