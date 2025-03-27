'use client'

import ThemeSwitcher from "./ThemeSwitcher"


const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full h-[10vh]">
        <h1 className="text-xl font-bold text-foreground ml-2 lg:ml-8 ">Ficha do Elder Scrolls de Mesa</h1>
        <ThemeSwitcher/>
    </header>
  )
}

export default Header
