import { Board } from '@mapistry/take-home-challenge-shared';

interface Props {
    handleClick(): void,
    value: Board[number]
}

export const Square = ({ handleClick, value }: Props) => (
    <td className="square">
        <button type='button' onClick={() => handleClick()}>{ value }</button>
    </td>
)