import React from "react";
import { Grid } from "@mui/material";
import TrelloCard from "../trelloCards/trelloCard"
import TrelloActionButton from "../TrelloActionButton/TrelloActionButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components"

import "./trelloList.scss"

const ListContainer = styled.div`
    background-color: #d8dde0;
    border-radius: 3px;
    max-width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
  `;

const TrelloList = ({ title, cards, _id, index, position }) => {


  return (
    <Draggable draggableId={String(_id)} position={position} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(_id)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{title}</h4>
                <MoreHorizIcon />
                {cards.map((card, index) => 
                <Grid item xs={12} key={card.id} index={index}>
                  <TrelloCard
                    key={card.id}
                    text={card.text}
                    id={card.id}
                    index={index}
                  />
                </Grid>       
                )}
                {provided.placeholder}
                <TrelloActionButton _id={_id} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>


  )
}

export default TrelloList




// <Draggable draggableId={String(_id)} index={index}>
// {provided => (
//   <Droppable droppableId={String(_id)}>
//     {provided => (
//       <ListContainer
//         {...provided.droppableProps}
//         ref={provided.innerRef}
//         {...provided.dragHandleProps}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12} flex={1}
//             display='flex'
//             justifyContent="space-between"
//           >
//             <h4>{title}</h4>
//             <MoreHorizIcon />
//           </Grid>
//           {cards.map((card, index) => <Grid item xs={12} key={card.id} index={index}>
//             <TrelloCard
//               key={card.id}
//               text={card.text}
//               id={card.id}
//               index={index}
//             />
//           </Grid>
//           )}
//         </Grid>
//         <TrelloActionButton _id={_id} />
//         {provided.placeholder}
//       </ListContainer>
//     )
//     }
//   </Droppable>
// )}
// </Draggable>