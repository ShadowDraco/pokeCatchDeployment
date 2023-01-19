import { useContext, useEffect } from "react"
import axios from "axios"

import { UserContext } from "../../App"
import { PokemonContext } from "../../App"
import "./ChooseStarterPokemon.css"

import Container from "react-bootstrap/Container"

export default function ChooseStarterPokemon() {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { starterPokemon, setStarterPokemon } = useContext(PokemonContext)

  useEffect(() => {
    sessionStorage.getItem("STARTERS")
      ? fetchStarterPokemon()
      : getStarterPokemon()
  }, [])

  async function fetchStarterPokemon() {
    await setStarterPokemon(JSON.parse(sessionStorage.getItem("STARTERS")))
    console.log("fetched the starters")
  }

  async function getStarterPokemon() {
    console.log("getting starter pokemon!")

    const starters = ["charmander", "bulbasaur", "squirtle"]

    const pokemon = []
    let currentStarter

    for (const starter in starters) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${starters[starter]}`)
        .then(res => {
          console.log("got a starter pokemon!")

          currentStarter = res.data
        })
      // get the pokemon's genera
      await axios.get(currentStarter.species.url).then(res => {
        currentStarter.genera = res.data.genera[7].genus

        console.log(currentStarter.name)
        pokemon.push(currentStarter)
      })
    }

    setStarterPokemon([...starterPokemon, pokemon])

    sessionStorage.setItem("STARTERS", JSON.stringify(pokemon))
    console.log("done getting starters")
  }

  function choosePokemon(i) {
    console.log(i)
    const newPokemon = starterPokemon[i]
    console.log(newPokemon)
    newPokemon.stats.push({ level: 5, xp: 0, xp_cap: 10 })
    newPokemon.isStarter = true
    newPokemon.isInTeam = true

    axios
      .post("https://poke-catch.herokuapp.com/user/add-pokemon-to-team", {
        user: currentUser,
        pokemon: newPokemon,
      })
      .then(res => {
        console.log(res.data)
        setCurrentUser(res.data.updatedUser)
      })
  }

  return (
    <Container className="flex flex-column">
      <h1 className="text-light text-center bg-gray">
        Choose your starter Pokemon!
      </h1>
      <Container className="flex flex-center">
        {starterPokemon?.map((pokemon, i) => {
          return (
            <PokemonCard
              pokemon={pokemon}
              index={i}
              type="starter"
              key={i}
              onClick={() => {
                choosePokemon(i)
              }}
            />
          )
        })}
      </Container>
    </Container>
  )
}
