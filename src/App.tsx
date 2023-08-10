import ArrowButton from "./components/ArrowButton.tsx";

function App() {
  return <div className={"m-9 flex w-[200px] justify-between "}>

  <ArrowButton direction={'top'} disabled={false} variant={'faq'} onClick={() => console.log('clicked')}/>
    <ArrowButton direction={'bottom'} disabled={false} variant={'faq'} onClick={() => console.log('clicked')}/>
    <ArrowButton direction={'left'}   disabled={false} variant={'carousel'} onClick={() => console.log('clicked')}/>
    <ArrowButton direction={'right'}  disabled={true} variant={'carousel'} onClick={() => console.log('clicked')}/>
  </div>;
}

export default App;
