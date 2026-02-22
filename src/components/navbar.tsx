import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import AnimationComponent from "@/components/animation";
import { House, Github, Sun, Moon, Code2, CircleUser } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

export default function NavbarComponent() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const scrollIntoView = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-between py-4 px-4">
      <AnimationComponent
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <img
            src="https://cdn.discordapp.com/avatars/180300895764873216/120d610bdc5aa93cbb3a4cd4debf56d5.png?size=64"
            className="h-10 w-10 rounded-full shadow-xs"
            draggable={false}
          />
        </div>
      </AnimationComponent>
      <AnimationComponent
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuLink asChild>
                    <a
                      className="cursor-pointer"
                      onClick={() => scrollIntoView("home")}
                    >
                      <House className="text-accent-foreground" />
                    </a>
                  </NavigationMenuLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuLink asChild>
                    <a
                      className="cursor-pointer"
                      onClick={() => scrollIntoView("about-me")}
                    >
                      <CircleUser className="text-accent-foreground" />
                    </a>
                  </NavigationMenuLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>About Me</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuLink asChild>
                    <a
                      className="cursor-pointer"
                      onClick={() => scrollIntoView("projects")}
                    >
                      <Code2 className="text-accent-foreground" />
                    </a>
                  </NavigationMenuLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Projects</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuLink asChild>
                    <a
                      href="https://github.com/ophx/personal-website"
                      target="_blank"
                    >
                      <Github className="text-accent-foreground" />
                    </a>
                  </NavigationMenuLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Source Code</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavigationMenuLink asChild>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      <AnimationComponent
                        key={theme}
                        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {theme === "dark" ? (
                          <Sun className="text-accent-foreground" />
                        ) : (
                          <Moon className="text-accent-foreground" />
                        )}
                      </AnimationComponent>
                    </div>
                  </NavigationMenuLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Theme</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </AnimationComponent>
    </div>
  );
}
