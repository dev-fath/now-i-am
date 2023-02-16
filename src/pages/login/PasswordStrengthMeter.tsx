import { useCallback, useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthMeterPropsInterface {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterPropsInterface) => {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const calculatePasswordStrength = useCallback(() => {
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
  }, [password]);

  useEffect(() => {
    calculatePasswordStrength();
  }, [calculatePasswordStrength, password]);

  return (
    <div className="password-strength-meter">
      <div className={`strength-meter strength-${passwordStrength}`}></div>
      <div className="strength-text">
        <span>
          {passwordStrength === 0 ? 'Weak' : passwordStrength === 4 ? 'Strong' : 'Medium'}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
