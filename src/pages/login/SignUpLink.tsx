interface SignUpLinkPropsInterface {
  onClick: () => void;
}

const SignUpLink = ({ onClick }: SignUpLinkPropsInterface) => {
  return (
    <div className="signup-link">
      <button onClick={onClick}>Sign up</button>
    </div>
  );
};

export default SignUpLink;
