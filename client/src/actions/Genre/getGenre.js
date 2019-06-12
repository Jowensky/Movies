const GetGenres = async (res, data) => {

    console.log(res, data)
    const mediaGenre =  []
    for (let gen in data) {
      const genre = res.data.genres.find(genre => genre.id === data[gen])
        await mediaGenre.push(genre.name)
    }
    console.log(mediaGenre)
    return mediaGenre
}

export default GetGenres;