export default async function handler(req, res) {
  const { user, type, collectives } = req.query;

  let itens = [];
  let member = [];

  if (user && type && collectives) {
    for (const collective of collectives.split(";")) {
      const data = await getCollective(collective);

      if (data) {
        const members = await getCollectiveMembers(collective, type);

        if (members) {
          const me = await getMemberDataFromCollectiveMembers(members, user);

          if (me) {
            const info = getDataTransformed(data, me);
            itens.push(info);
            if (member.length === 0) {
              member = await getUser(me);
            }
          }
        }
      }
    }
  }

  res.status(200).json({ itens, member });
}

function getDataTransformed(data, member) {
  return {
    ...data,
    amount: member.totalAmountDonated,
    currency: member.currency,
  };
}

async function getUser(member) {
  const { name, profile, company, description, image } = member;
  return {
    name,
    profile,
    company,
    description,
    image,
  };
}

async function getCollective(collective) {
  return await fetch(`https://opencollective.com/${collective}.json`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

async function getCollectiveMembers(collective, type) {
  return await fetch(
    `https://opencollective.com/${collective}/members/${type}.json`
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

async function getMemberDataFromCollectiveMembers(json, user) {
  return json
    .filter((item) => item.profile === `https://opencollective.com/${user}`)
    .find((i) => i);
}
