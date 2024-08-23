import { Dispatch } from "react"
import { styled } from "styled-components"

const Star = styled.span`
    margin-left: 10px;
    cursor: pointer;
    font-size: 24px;
    position: relative;
    top: 2px;
`

type FavoriteProp = {
    isFavorite: boolean
    onClickHandler: () => void
}

const Favorite = ({isFavorite, onClickHandler}:FavoriteProp) => {
    return (
        <Star onClick={onClickHandler}>
        {isFavorite? '★':'☆'}
        </Star>
    )
}

export default Favorite