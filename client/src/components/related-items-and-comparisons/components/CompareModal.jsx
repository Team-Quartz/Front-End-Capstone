import styled from "styled-components";

const Container = styled.div`
  width: 310px;
  height: 200px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: grey;
  color: #000;
  position: absolute;
  left: 8%;
  top: 10%;
  z-index: 100;
  border-radius: 5px;
  overflow: auto;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  justify-items: stretch;
  align-items: start;
  background: lightgray;
  position: relative;
`;

const Top = styled.div`
  display: grid;
  width: 290px;
  grid-template-columns: repeat(3, 1fr);
  position: fixed;
  z-index: 10;
  background: lightgrey;
  grid-column: 1/4;
  margin: 2px;
`;

const CompareTitle = styled.div`
  grid-column: 1/4;
  align-self: start;
  position: relative;
  font-size: 12px;

`

const Header = styled.div`
  width: 105%;
  grid-column: 1/4;
  display: grid;
  grid-template-columns: (1fr .5fr 1fr);
  position: relative;
  font-size: 15px;
  font-weight: 900;
`
const CurrentProduct = styled.div`
  grid-column: 1/2;
`

const ComparedProduct = styled.div`
  grid-column: 3/4;
  justify-self: end;
  text-align: end;
`

const Body = styled.div`
  grid-row: 2/5;
  grid-column: 1/4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows:minmax(14px, 15px);
`
const LeftColumn = styled.div`
  grid-column: 1/2;
  display:grid;
  row-gap: 5px;
  font-size: 11px;
  justify-items: center;
`

const MidColumn = styled.div`
  grid-column: 2/3;
  display:grid;
  row-gap: 5px;
  font-size: 12px;
  font-weight: 900;
  justify-items: center;
`

const RightColumn = styled.div`
  grid-column: 3/4;
  display:grid;
  row-gap: 5px;
  font-size: 11px;
  justify-items: center;

`;

const InnerRightColumn = styled.div`
  height: 15px;
`
const InnerLeftColumn = styled.div`
  height: 15px;
`
const InnerMiddleColumn = styled.div`
  height: 15px;
`

const CompareModal = ({ showCompare, setShowCompare, combinedFeatures }) => {
  var {currentProduct, feature, comparisonProduct} = combinedFeatures;

  return (
    <>
      {showCompare ? (
        <Container showCompare={showCompare}>
          <Wrapper>
           <Top>
             <CompareTitle>Compare</CompareTitle>
             <Header>
               <CurrentProduct>Product 1</CurrentProduct>
               <ComparedProduct>Product 2</ComparedProduct>
             </Header>
           </Top>
           <Body>
             <LeftColumn>
             {currentProduct
              // .map((item) => {
              //   return (item === undefined ? "✗" : item);
              // })
              .map((value, index) => {
               return (<InnerLeftColumn key={index}>{value}</InnerLeftColumn>)
             })}
             </LeftColumn>
             <MidColumn>
             {feature.map((value, index) => {
               return (<InnerMiddleColumn key={index}>{value}</InnerMiddleColumn>)
             })}
             </MidColumn>
             <RightColumn>
             {comparisonProduct
              // .map((item) => {
              //   return (item === undefined ? "✗" : item);
              // })
              .map((value, index) => {
               return (<InnerRightColumn key={index}>{value}</InnerRightColumn>)
             })}
             </RightColumn>
           </Body>
          </Wrapper>
        </Container>
      ) : null}
    </>
  );
};

export default CompareModal;
