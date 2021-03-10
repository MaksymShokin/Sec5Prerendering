const UserProfile = ({ name }) => {
  return (
    <div>
      <h1>User {name}</h1>
    </div>
  );
};

export default UserProfile;

export const getServerSideProps = async context => {

  return {
    props: {
      name: 'Max'
    }
  };
};
