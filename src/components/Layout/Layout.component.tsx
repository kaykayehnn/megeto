import React, { FunctionComponent, useState } from "react"
import { ThemeProvider, StylesProvider } from "@material-ui/styles"
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
import AndroidIcon from "@material-ui/icons/AndroidOutlined"
import ScheduleIcon from "@material-ui/icons/Schedule"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import { Link } from "gatsby"

import { ReactComponent as Logo } from "@Vectors/logo.svg"

import styles from "./Layout.module.scss"
import "./global.css"

const MENUS = [
  {
    text: "Начало",
    Icon: HomeIcon,
    pathname: "/",
  },
  {
    text: "За гимназията",
    Icon: SchoolIcon,
    pathname: "/about",
  },
  {
    text: "Новини",
    Icon: InfoIcon,
    pathname: "/news",
  },
  {
    text: "Колектив",
    Icon: AndroidIcon,
    pathname: "/collective",
  },
  {
    text: "Програма",
    Icon: ScheduleIcon,
    pathname: "/schedule",
  },
  {
    text: "Документи",
    Icon: BookmarkBorderIcon,
    pathname: "/documents",
  },
]

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
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

export interface LayoutProps {
  location: string
}

const Layout: FunctionComponent<LayoutProps> = ({ children, location }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => setIsDrawerOpen(open => !open)
  const closeDrawer = () => setIsDrawerOpen(false)

  const isHome = location === "/"

  return (
    <StylesProvider injectFirst>
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
            {!isHome && (
              <div className={styles.headerContainer}>
                <Typography variant="h6" color="inherit">
                  Математическа Гимназия&nbsp;
                </Typography>
                <Typography variant="h6" color="inherit">
                  &quot;Академик Кирил Попов&quot;
                </Typography>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
          <Logo className={styles.logo} />
          <List>
            {MENUS.map(({ text, Icon, pathname }) => (
              <ListItem
                key={text}
                button
                component={Link}
                to={pathname}
                onClick={closeDrawer}
                selected={pathname === location}
              >
                <ListItemIcon onClick={toggleDrawer}>
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
    </StylesProvider>
  )
}

export default Layout
