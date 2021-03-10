const UserIdPage = (props) => {
  return <h1>User id {props.id}</h1>;
};

export default UserIdPage;

export const getServerSideProps = async context => {
  const { params } = context;

  const uid = params.uid;

  return {
    props: {
      id: 'user-id' + uid
    }
  };
};
