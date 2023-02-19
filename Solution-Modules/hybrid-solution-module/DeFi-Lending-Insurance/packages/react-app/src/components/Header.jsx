import React from "react";
import { PageHeader } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

// displays a page header

export default function Header({networkName, networks}) {
   
    const { currentTheme } = useThemeSwitcher();

    const names = [];
    if(!networkName){
      for(let key in networks){
          names.push(networks[key].name);
      }
    }
    return (
      <div>
        <PageHeader
            title="Parametric Digital Asset Risk Management"
            subTitle={networkName ? '@' + networkName : "Invalid Network. Switch to " + names.join(', ')}
            avatar={{src: process.env.PUBLIC_URL + '/logo192_'+ currentTheme + '.png', size: 50}}
          />
      </div>
    );
}
