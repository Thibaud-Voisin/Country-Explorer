import './App.scss';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSubTextCharacter from "./AnimatedSubTextCharacter";
import Select, { components } from 'react-select';


function App() {

  const [theme, setTheme] = useState('dark');
  const [options, setOptions] = useState([]);
  const [showTextInput, setshowTextInput] = useState(false);
  const [index, setIndex] = useState(0);
  const [isVisibleAlert, setIsVisibleAlert] = useState(false); // State to manage visibility
  const texts = ["COUNTRY EXPLORER", "EXPLORADOR DE PAÍSES", "国 家 探 险 家",  "COUNTRY EXPLORER", "LÄNDERFORSCHER ", "EXPLORATEUR DE PAYS"]; // Your list of texts


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'cupcake' : 'dark');
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    setTimeout(() => {
      setshowTextInput(true);
    }, 600);
  
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4500);
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all'); // Replace with your API endpoint
        if (!response.ok) {
          setIsVisibleAlert(!isVisibleAlert); // Toggle visibility when clicked
          console.log('Error fetching data');
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const fetchedOptions = data.map((country, index) => ({
          value: `option${index + 1}`,
          label: country.name.common,
          icon: country.flags.png // Assuming the 'flags' object contains the URL for the icon
        }));
        const sortedOptions = fetchedOptions.sort((a, b) => a.label.localeCompare(b.label));
        setOptions(sortedOptions);
      } catch (error) {
        setIsVisibleAlert(!isVisibleAlert); // Toggle visibility when clicked
        console.error('Error fetching data:', error);
        // Handle errors or set appropriate state to indicate the error
      }
    };
    fetchData();
  
    document.querySelector('html').setAttribute('data-theme', theme);
  
    return () => {
      clearInterval(interval);
    };
  }, [texts.length, theme, isVisibleAlert]);

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      padding: '0 0 0 1rem',
      textAlign: 'left',
      borderRadius: '0.5rem  0 0 0.5rem',
      margin: '4vh 0 0 0',
      fontSize: '1.5rem',
      height: '8vh',
      width: '50vw',
      backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
      border: '1px solid gray', // Change the border style based on focus
      boxShadow: 'none',
      '&:hover': theme === 'dark' ? {border: '1px solid white'} : {border: '1px solid black'},
      color: theme === 'dark' ? 'white' : 'black',
    }),
    option: (provided, state) => ({
      ...provided,
      color: theme === 'dark' ? 'white': 'black', // Change the color of the option text here
      backgroundColor: theme === 'dark' ? state.isFocused ? '#1d2229' : '#2a323c': state.isFocused ? '#ffefd4' : 'white',
      textAlign: 'left',
      padding: '1rem',
      fontSize: '1.2rem',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme === 'dark' ?  '#2a323c': '#FCF6EC',
      color: theme === 'dark' ? 'white' : 'black', // Change the text color based on the theme

    }),
    input: (base) => ({
      ...base,
      color: theme === 'dark' ? 'white': 'black', // Change the color of the input text here
    }),
    singleValue:(base) => ({
      ...base,
      color: theme === 'dark' ? 'white': 'black', // Change the color of the input text here
    }),
    placeholder: (base) => ({
      ...base,
      color: 'gray', // Change the color of the input text here
    }),
  };

  const { Option } = components;
  const IconOption = props => (
    <Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={props.data.icon}
        style={{ width: 36, marginRight: 10}}
        alt={props.data.label}
      />
      {props.data.label}
      </div>
    </Option>
  );


  return (
    <div className="App">
      <header>
      <label className="theme_selector swap swap-rotate">
        <input type="checkbox" className="theme-controller" onClick={toggleTheme} />
          <svg className="swap-on w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          <svg className="swap-off w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>
    <div>
      {isVisibleAlert && (
        <motion.div className='flex justify-center items-center w-screen' 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.2 }}>
        <div role="alert" className="alert alert-error w-[50vw] mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error | Unable to fetch country list. Check your internet connection</span>
        </div>
      </motion.div>
      )}
    </div>
      </header>

    <div className="container">
    <div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="title"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
      <AnimatePresence>
          <AnimatedSubTextCharacter
            key="subText"
            text="Select a country and discover its languages, capital, currencies and much more !!"
          />
        {showTextInput && (
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
<div style={{ display: 'flex', alignItems: 'center' }}>
  <Select
    placeholder='Select a country...'
    searchable
    options={options}
    onChange={(selectedOption) => {
      console.log('Selected:', selectedOption);
    }}
    styles={selectStyles}
    components={{ Option: IconOption }}
  />

  <button className={`ml-1 rounded-r-lg mt-[4vh] text-xl h-[8vh] w-[7vw] border border-gray-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${theme === 'dark' ? 'text-white' : 'text-black'} ${theme === 'dark' ? 'hover:border-white' : 'hover:border-black'}`}>Search</button>
</div>
        </motion.div>
      
      
        )}
      </AnimatePresence>

    </div>
    <div className='result w-[100vw] bg-gray-50 h-[100vh]'>

    </div>
    <footer className="footer h-[6vh] items-center p-4 bg-neutral text-neutral-content">
  <aside className="items-center grid-flow-col">
    <p>Copyright © 2023 Bounce Insights - All right reserved</p>
  </aside> 
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href='https://twitter.com/BounceInsights' ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
    </a>
    <a href='https://www.youtube.com/channel/UCa7OEXxTHM1H4bhcJYFU5CA'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
    <a href='https://www.linkedin.com/company/bounceinsights/'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M 21.125 0 L 4.875 0 C 2.183594 0 0 2.183594 0 4.875 L 0 21.125 C 0 23.816406 2.183594 26 4.875 26 L 21.125 26 C 23.816406 26 26 23.816406 26 21.125 L 26 4.875 C 26 2.183594 23.816406 0 21.125 0 Z M 8.039063 22.070313 L 4 22.070313 L 3.976563 9.976563 L 8.015625 9.976563 Z M 5.917969 8.394531 L 5.894531 8.394531 C 4.574219 8.394531 3.722656 7.484375 3.722656 6.351563 C 3.722656 5.191406 4.601563 4.3125 5.945313 4.3125 C 7.289063 4.3125 8.113281 5.191406 8.140625 6.351563 C 8.140625 7.484375 7.285156 8.394531 5.917969 8.394531 Z M 22.042969 22.070313 L 17.96875 22.070313 L 17.96875 15.5 C 17.96875 13.910156 17.546875 12.828125 16.125 12.828125 C 15.039063 12.828125 14.453125 13.558594 14.171875 14.265625 C 14.066406 14.519531 14.039063 14.867188 14.039063 15.222656 L 14.039063 22.070313 L 9.945313 22.070313 L 9.921875 9.976563 L 14.015625 9.976563 L 14.039063 11.683594 C 14.5625 10.875 15.433594 9.730469 17.519531 9.730469 C 20.105469 9.730469 22.039063 11.417969 22.039063 15.046875 L 22.039063 22.070313 Z"></path>
 </svg></a>
  </nav>
</footer>
    </div>
  );
}

export default App;