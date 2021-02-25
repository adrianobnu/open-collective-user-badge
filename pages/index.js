import "tailwindcss/tailwind.css";
const axios = require("axios");

const Badge = ({ itens, member }) => {
  return (
    <div className="bg-white mt-24 relative shadow-xl mx-auto">
      <div className="flex justify-center">
        <img
          src={member.image}
          alt={member.name}
          className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-2xl border-4 border-white"
        />
      </div>

      <div className="mt-16">
        <h1 className="font-bold text-center text-3xl text-gray-900">
          {member.name}
        </h1>
        <div className="my-5">
          <a
            href="#"
            className="text-indigo-200 block text-center font-medium leading-6 px-6 py-3 bg-indigo-600"
          >
            {member.profile}
          </a>
        </div>
        <div className="w-full">
          <div className="mt-5 w-full text-2xl">
            {itens &&
              itens.map((item, index) => {
                return (
                  <a
                    href="#"
                    className="w-full border-t-2 border-gray-100 text-gray-600 py-4 px-4 block hover:bg-gray-100 transition duration-150"
                    key={index}
                  >
                    <img
                      src={item.image}
                      alt={item.slug}
                      className="rounded-full h-6 shadow-md inline-block mr-2"
                    />
                    <span className="font-bold">{item.slug}</span>
                    <span className="text-gray-400 italic pl-2">
                      {item.amount}
                      {item.currency}
                    </span>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const response = await axios
    .get(`${process.env.APP_URL}/api/opencollective`, { params: context.query })
    .then((res) => res.data)
    .catch((error) => console.log(error.message));
  return {
    props: response,
  };
}

export default Badge;
