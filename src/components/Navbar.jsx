import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants/index.js"

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <div className="font-bold text-xl">Sahity Ghosh</div>
      <ul>
        {navLinks.map(({ id, name }) => (
            <li key={id}>
                <p>{name}</p>
            </li>
      ))}

      </ul>
      </div>

       <div>
         <ul>
            {navIcons.map(({ id, img }) => (
                <li key={id}>
                    <img src={img} className="icon-hover" alt={`icon-${id}`} />
                </li>
            ))}
         </ul>

          <time>{dayjs().format("ddd D MMM YYYY h:mm A")}</time>
       </div>
    </nav>
  )
}

export default Navbar
