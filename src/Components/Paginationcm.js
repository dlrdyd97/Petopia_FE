import Pagination from "react-bootstrap/Pagination";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid #dbdbdb;
  border-left: none;
  padding: 6px 12px 6px 12px;
  margin: 0;
  background: white;
  color: #537fe7;
  font-size: 1rem;

  &:hover {
    background: #eeeeee;
    cursor: pointer;
    transform: translateY(-0px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #537fe7;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: white;
  }
`;

const Paginationcm = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <div className="listGroup">
      <div className="pagination">
        <Pagination className="pagenation">
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          />
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <Button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </Button>
            ))}

          <Pagination.Next
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          />
          <Pagination.Last
            onClick={() => setPage(numPages)}
            disabled={page === numPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Paginationcm;
