import { Tab } from "@headlessui/react";
import "../styles/Tabs.css"
import React from "react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className='outer-div'>
      <Tab.Group className='outer-div-2'>
        <Tab.List className='tab-list'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "tab-selected",

                  selected
                    ? "option-1"
                    : "option-2"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='w-full-mt-2'>{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}