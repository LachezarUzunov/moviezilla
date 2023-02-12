const APP_URL = "/api/lists";

// Create a new watchlist
const createList = async (listData, token) => {
  const response = await fetch(APP_URL, {
    method: "POST",
    body: JSON.stringify(listData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.message);
  }

  if (response.status === 201) {
    const watchlist = await response.json();
    localStorage.setItem("list", JSON.stringify(watchlist));
    return watchlist;
  }
};

const updateList = async (movie, listId, token) => {
  const response = await fetch(`${APP_URL}/${listId}`, {
    method: "PUT",
    body: JSON.stringify(movie),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    const updatedList = await response.json();
    return updatedList;
  }
};

// Get my watchlist
const getMyList = async (token) => {
  const response = await fetch(`${APP_URL}/mine`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const myWatchlist = await response.json();
    localStorage.setItem("list", JSON.stringify(myWatchlist));
    return myWatchlist;
  }
};

// Delete a list
const deleteList = async (listId, token) => {
  const response = await fetch(APP_URL + listId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    return response.message;
  }
};

const listService = {
  createList,
  deleteList,
  updateList,
  getMyList,
};

export default listService;
