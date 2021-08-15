import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Zhihu} from "./zhihu/Zhihu";
import {Problem} from "./zhihu/Problem";
import {User} from "./zhihu/User";
import {Banner} from "./zhihu/Banner";


/*export function Tree({items,depth=0}) {

    const hasChildren = items && items.length
    return hasChildren&&items.map(item=>(<>
           <div style={{paddingLeft:depth*15}}>{item.name}</div>
        <Tree items={item.children} depth={depth+1}/>
    </>)
    )
}*/



export const MyRoute = ({children}) => {
    const info = [
        {name: "/exams", component: Zhihu},

        {name: "/zhihu", component: Zhihu},

        {name: "/problem/:id", component: Problem},
        {name: "/user/:id", component: User},
        {name: "/banner", component:  Banner},

        {name:"/user",component:User}
        ]
    return <BrowserRouter>
        <Switch>
            {children}
            {info.map((it, index) => (
                <Route path={it.name} key={index} component={it.component}/>))}
        </Switch>
    </BrowserRouter>


}


