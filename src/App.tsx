import Link from "./components/Link.tsx";
import NavigationLink from "./components/NavigationLink.tsx";

function App() {
  return (
    <div className={"flex "}>
      <div className={'mt-5 ml-5'}>
        Small <NavigationLink
          to={'/укукук'}
          variant={"primary"}
          size={"small"}
        >primary</NavigationLink>
       Large  <NavigationLink
          to={'/укукук'}
          variant={"primary"}
          size={"large"}
        >primary</NavigationLink>

        Large Disable  <NavigationLink
        to={'/укукук'}
        variant={"primary"}
        size={"large"}
        disabled={true}

      >primary</NavigationLink>
        Small Disable  <NavigationLink
        to={'/укукук'}
        variant={"primary"}
        size={"small"}
        disabled={true}

      >primary</NavigationLink>

      </div>
      <div className={'mt-5 ml-5 flex flex-col bg-black p-10 text-white'}>
        Primary dark small  <NavigationLink
        to={'/укукук'}
        variant={"primaryDarkBg"}
        size={"small"}
      >Dark</NavigationLink>

        Primary dark  <NavigationLink
        to={'/укукук'}
        variant={"primaryDarkBg"}
        size={"large"}
      >Dark</NavigationLink>

        Primary dark small Disable  <NavigationLink
        to={'/укукук'}
        variant={"primaryDarkBg"}
        size={"small"}
        disabled={true}
      >Dark</NavigationLink>


        Primary dark large Disable  <NavigationLink
        to={'/укукук'}
        variant={"primaryDarkBg"}
        size={"large"}
        disabled={true}
      >Dark</NavigationLink>

      </div>
      <div className={'mt-5 ml-5 flex flex-col'}>

        large  <NavigationLink
          to={'/укукук'}
          variant={"secondary"}
          size={"large"}

        >secondary</NavigationLink>
        wideMob  <NavigationLink
          to={'/укукук'}
          variant={"secondary"}
          size={"wideMob"}

        >secondary</NavigationLink>
        large Disable <Link
        to={'/укукук'}
        variant={"secondary"}
        size={"large"}
        disabled={true}

      >secondary</Link>
        wideMob Disable  <NavigationLink
        to={'/укукук'}
        variant={"secondary"}
        size={"wideMob"}
        disabled={true}

      >secondary</NavigationLink>
      </div>
      <div className={'mt-5 ml-5 bg-yellow100 flex flex-col'}>
        <NavigationLink
          to={'/454545'}
          variant={"underlineSideBar"}

        >Політика конфіденційності</NavigationLink>
        <NavigationLink
          to={'/7878787878'}
          variant={"underlineNoneSideBar"}
        >Про нас</NavigationLink>
      </div>

    </div>
  )

}

export default App;
