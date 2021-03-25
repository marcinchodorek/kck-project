const rootElement = document.documentElement;
const commentSection = document.querySelector('.comments');

const removeElement = (element) => {
    const parent = element.parentElement;
    parent.remove();
}

const goToTop = () => {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const getCommentsData = async () => {
    const postsQuery = `https://jsonplaceholder.typicode.com/posts`;
    const postsRequest = await fetch(postsQuery);
    const postsData = await postsRequest.json();
    const usersQuery = `https://jsonplaceholder.typicode.com/users`;
    const usersRequest = await fetch(usersQuery);
    const usersData = await usersRequest.json();

    return { postsData: postsData.slice(0, 5), usersData: usersData.slice(0, 5) };
}

const updateComments = (data) => {
    const { postsData, usersData } = data;

    for (let i = 0; i < postsData.length; i++) {
        commentSection.innerHTML += `
        <div class="comment-card">
            <div class="comment-user">
                <img src="https://source.unsplash.com/random/200x200?sig=${usersData[i].id}" alt="">
                <div>${usersData[i].username}</div>
            </div>
            <div class="comment-content">
                <h3>${postsData[i].title}</h3>
                <p>${postsData[i].body}</p>
            </div>
        </div>
    `;
    }


}

getCommentsData().then(data => updateComments(data));