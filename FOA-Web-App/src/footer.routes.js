// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
// import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Friends Of Animal",
    image: "https://friendsofanimals.org.in/Images/logo.png",
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "",
    },
    {
      icon: <TwitterIcon />,
      link: "",
    },
    {
      icon: <GitHubIcon />,
      link: "",
    },
    {
      icon: <YouTubeIcon />,
      link: "",
    },
  ],
  menus: [
    {
      name: "Organization",
      items: [
        { name: "Ways to donate", href: "" },
        { name: "Get involved", href: "" },
        { name: "About us", href: "" },
        { name: "For sponsors", href: "" },
      ],
    },

    {
      name: "Reach",
      items: [
        { name: "Instagram", href: "" },
        { name: "Facebook", href: "" },
        { name: "Twitter", href: "" },
        { name: "Linkedin", href: "" },
      ],
    },
    {
      name: "Animal Care Resources",
      items: [
        { name: "Animal Care Illustrations", href: "" },
        { name: "Animal Care Tips & Advice", href: "" },
        { name: "Animal Care Partnerships Program", href: "" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "" },
        { name: "privacy policy", href: "" },
        { name: "licenses (EULA)", href: "" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date}{" "}
      <MKTypography
        component="a"
        href=""
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Friends Of Animal
      </MKTypography>
      .
    </MKTypography>
  ),
};
