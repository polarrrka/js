const data = [
  {
    name: 'Konicek',
    age: 2,
    gender: 'kralik',
    lookingfor: 'mrkvicka',
    location: 'Praha',
    image: 'https:randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: 'Jani',
    age: 28,
    gender: 'female',
    lookingfor: 'men',
    location: 'Praha',
    image: 'https:randomuser.me/api/portraits/women/55.jpg'
  },
    {
    name: 'Jiri',
    age: 29,
    gender: 'male',
    lookingfor: 'women',
    location: 'Mars',
    image: 'https:randomuser.me/api/portraits/men/30.jpg'
  },
];

const profiles = profileIterator(data);
nextProfile(); //objeví se první profil automaticky před tím než se stiskne next
document.querySelector('#next').addEventListener('click', nextProfile);

function nextProfile () {
  const currentProfile = profiles.next().value;

  if (currentProfile !== undefined) {
  document.querySelector('#profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">name - ${currentProfile.name}</li>
      <li class="list-group-item">age - ${currentProfile.age}</li>
      <li class="list-group-item">location - ${currentProfile.location}</li>
      <li class="list-group-item">preference - ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
    </ul>`;
  document.querySelector('#imageDisplay').innerHTML = `
  <img src="${currentProfile.image}">`;
  } else {
    window.location.reload(); // když dojde nakonec načte stránku znova
  }
}

function profileIterator(profiles) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < profiles.length ? {value: profiles[nextIndex++], done: false} : {done: true}
    }
  };
}