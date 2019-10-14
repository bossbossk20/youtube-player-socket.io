import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const ItemWrapper = styled.article`
  display: flex;
  margintop: 10px;
`

const ItemImage = styled.img`
  width: 250px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  text-align: center;
  margin-left: 8px;
`

const PlayListItem = ({ image, alt, title, onAdd, onRemove }) => (
  <ItemWrapper>
    <div>
      <ItemImage src={image} alt={alt} />
    </div>
    <ContentWrapper>
      <div>{title}</div>
      {(onAdd || onRemove) && (
        <Button type="primary" onClick={onAdd || onRemove}>
          {onAdd ? 'ADD' : 'REMOVE'}
        </Button>
      )}
    </ContentWrapper>
  </ItemWrapper>
)

PlayListItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.node.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
}

PlayListItem.defaultProps = {
  alt: 'Thumbnail'
}

export default PlayListItem
