import Link from "./components/Link.tsx";

function App() {
  return (
    <div className={"flex "}>
      <div className={'mt-5 ml-5'}>
        Small <Link
          to={'/укукук'}
          component={'NavLink'}
          variant={"primary"}
          size={"small"}
        >primary</Link>
       Large  <Link
          to={'/укукук'}
          component={'a'}
          variant={"primary"}
          size={"large"}
        >primary</Link>

        Large Disable  <Link
        to={'/укукук'}
        component={'a'}
        variant={"primary"}
        size={"large"}
        disabled={true}

      >primary</Link>
        Small Disable  <Link
        to={'/укукук'}
        component={'a'}
        variant={"primary"}
        size={"small"}
        disabled={true}

      >primary</Link>

      </div>
      <div className={'mt-5 ml-5 flex flex-col bg-black p-10 text-white'}>
        Primary dark small  <Link
        to={'/укукук'}
        component={'a'}
        variant={"primaryDarkBg"}
        size={"small"}
      >Dark</Link>

        Primary dark  <Link
        to={'/укукук'}
        component={'NavLink'}
        variant={"primaryDarkBg"}
        size={"large"}
      >Dark</Link>

        Primary dark small Disable  <Link
        to={'/укукук'}
        component={'NavLink'}
        variant={"primaryDarkBg"}
        size={"small"}
        disabled={true}
      >Dark</Link>


        Primary dark large Disable  <Link
        to={'/укукук'}
        component={'a'}
        variant={"primaryDarkBg"}
        size={"large"}
        disabled={true}
      >Dark</Link>

      </div>

      <div className={'mt-5 ml-5 flex flex-col'}>

        large  <Link
          to={'/укукук'}
          component={'NavLink'}
          variant={"secondary"}
          size={"large"}

        >secondary</Link>
        wideMob  <Link
          to={'/укукук'}
          component={'a'}
          variant={"secondary"}
          size={"wideMob"}

        >secondary</Link>
        large Disable <Link
        to={'/укукук'}
        component={'NavLink'}
        variant={"secondary"}
        size={"large"}
        disabled={true}

      >secondary</Link>
        wideMob Disable  <Link
        to={'/укукук'}
        component={'a'}
        variant={"secondary"}
        size={"wideMob"}
        disabled={true}

      >secondary</Link>
      </div>

      <div className={'mt-5 ml-5 bg-black flex flex-col'}>
        <Link
          to={'/укукук'}
          component={'a'}
          variant={"fileLink"}

        >Політика конфіденційності</Link>
        <Link
          to={'/укукук'}
          component={'a'}
          variant={"listLink"}
        >Про нас</Link>
      </div>

    </div>
  )

}

export default App;
