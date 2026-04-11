import Link from "next/link";

export default function StrongPasswordGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        안전한 비밀번호 만드는 법 - 2024년 완벽 가이드
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.10</time>
        <span>·</span>
        <span>읽기 7분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          2023년 한 해에만 전 세계에서 약 33억 개의 계정 정보가 유출되었습니다. 그 중 상당수는 단순한 비밀번호 때문이었습니다.
          &quot;123456&quot;, &quot;password&quot;, &quot;qwerty&quot; 같은 비밀번호는 해커의 자동화 프로그램이 1초 안에 뚫을 수 있습니다.
          이 글에서는 해커도 쉽게 풀 수 없는 강력한 비밀번호를 만드는 원칙과 실용적인 팁을 알려드립니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">왜 강력한 비밀번호가 필요한가?</h2>
        <p className="mb-4 leading-relaxed">
          해커들이 비밀번호를 뚫는 방법은 크게 세 가지입니다. 첫째는 <strong>무차별 대입 공격(Brute Force)</strong>으로,
          가능한 모든 조합을 시도하는 방식입니다. 둘째는 <strong>사전 공격(Dictionary Attack)</strong>으로, 자주 쓰이는 단어와
          패턴의 목록을 이용합니다. 셋째는 <strong>크리덴셜 스터핑(Credential Stuffing)</strong>으로, 이미 유출된
          아이디·비밀번호 조합을 다른 사이트에 대입하는 방식입니다.
        </p>
        <p className="mb-4 leading-relaxed">
          무차별 대입 공격의 경우, 소문자만으로 이루어진 8자리 비밀번호는 현대 컴퓨터로 몇 분 안에 뚫립니다.
          하지만 대소문자·숫자·특수문자를 모두 포함한 16자리 비밀번호는 현존하는 컴퓨터로는 수억 년이 걸립니다.
          비밀번호의 길이와 복잡도가 핵심입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">강력한 비밀번호의 5가지 원칙</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. 최소 12자 이상의 길이</h3>
        <p className="mb-4 leading-relaxed">
          가장 중요한 원칙은 길이입니다. 보안 전문가들은 최소 12자, 가능하면 16자 이상을 권장합니다.
          길이가 1자 늘어날 때마다 해킹에 필요한 시간이 기하급수적으로 늘어납니다.
          8자리 비밀번호와 12자리 비밀번호의 보안 수준은 수천 배 차이가 납니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. 대소문자·숫자·특수문자 혼합</h3>
        <p className="mb-4 leading-relaxed">
          소문자 26개, 대문자 26개, 숫자 10개, 특수문자 32개를 모두 사용할 경우 가능한 문자 조합은 94가지입니다.
          소문자만 사용할 때 26가지인 것에 비해 약 3.6배 늘어납니다. 각 자리마다 선택지가 늘어나므로
          전체 조합 수는 지수함수적으로 증가합니다.
        </p>
        <p className="mb-4 leading-relaxed">
          예를 들어, <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">P@ssw0rd!</code>처럼
          눈에 보이는 대체는 해커들이 이미 알고 있습니다. &quot;a→@&quot;, &quot;o→0&quot; 같은 패턴은 사전 공격 목록에 포함되어 있습니다.
          무작위로 혼합하는 것이 훨씬 효과적입니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. 개인정보 사용 금지</h3>
        <p className="mb-4 leading-relaxed">
          생년월일, 이름, 전화번호, 주소 등 개인정보는 절대 사용하지 마세요. SNS를 조금만 뒤지면 누구의 생년월일이나
          반려동물 이름 정도는 쉽게 알 수 있습니다. 이런 정보를 포함한 비밀번호는 타겟형 공격에 매우 취약합니다.
          특히 &quot;홍길동1990&quot; 같은 이름+연도 조합은 절대 사용하지 마세요.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. 사이트마다 다른 비밀번호 사용</h3>
        <p className="mb-4 leading-relaxed">
          하나의 비밀번호를 여러 사이트에서 사용하는 것은 매우 위험합니다. 보안이 취약한 사이트 하나가 해킹당하면
          그 비밀번호로 다른 모든 사이트에 접근 시도가 이루어집니다. 이것이 크리덴셜 스터핑 공격입니다.
          비밀번호 관리자를 사용하면 사이트마다 다른 강력한 비밀번호를 편리하게 관리할 수 있습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">5. 주기적 변경과 2단계 인증</h3>
        <p className="mb-4 leading-relaxed">
          중요한 계정은 3~6개월마다 비밀번호를 변경하는 것이 좋습니다. 또한 가능하다면 반드시
          2단계 인증(2FA)을 활성화하세요. 비밀번호가 유출되더라도 2단계 인증이 있으면 계정을 보호할 수 있습니다.
          SMS 인증보다는 인증 앱(Google Authenticator, Authy 등)을 사용하는 것이 더 안전합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">좋은 비밀번호 vs 나쁜 비밀번호 예시</h2>
        <p className="mb-3 leading-relaxed">나쁜 비밀번호 (절대 사용하지 마세요):</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">123456789</code> — 전 세계 1위 유출 비밀번호</li>
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">password</code> — 2위. 영어 사용자가 가장 많이 씁니다</li>
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">qwerty123</code> — 키보드 배열 그대로 입력</li>
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">홍길동1990!</code> — 이름+생년 조합</li>
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">iloveyou</code> — 흔한 영어 문구</li>
        </ul>
        <p className="mb-3 leading-relaxed">좋은 비밀번호 예시:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">7#mKpL9!wQz2@nBv</code> — 16자, 완전 무작위</li>
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">Correct-Horse-Battery-Staple-42</code> — 패스프레이즈 방식, 기억하기 쉽고 길이가 길어 강력합니다</li>
          <li><code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">Tr0ub4dor&3!xK</code> — 의미 없는 혼합 문자열</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">패스프레이즈 방식이란?</h2>
        <p className="mb-4 leading-relaxed">
          완전히 무작위한 비밀번호는 기억하기 어렵습니다. 이 문제를 해결하는 방법이 패스프레이즈(passphrase)입니다.
          관련 없는 단어 4~5개를 이어 붙이는 방식으로, 예를 들어 &quot;사과-파란-기차-조용한-달&quot; 같은 조합입니다.
          이 방식은 28자 이상으로 길어서 무차별 대입 공격에 매우 강하고, 각 단어가 기억하기 쉬워 실용적입니다.
        </p>
        <p className="mb-4 leading-relaxed">
          중요한 점은 단어들이 서로 의미적으로 연결되지 않아야 한다는 것입니다. &quot;빠른갈색여우&quot;는
          영어의 &quot;the quick brown fox&quot;처럼 유명한 문구여서 취약합니다. 서로 무관한 단어들을
          무작위로 조합해야 합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">비밀번호 관리자 활용법</h2>
        <p className="mb-4 leading-relaxed">
          수십 개의 서비스마다 다른 강력한 비밀번호를 모두 기억하는 것은 불가능합니다. 비밀번호 관리자가 해결책입니다.
          1Password, Bitwarden, LastPass 같은 도구는 모든 비밀번호를 암호화해서 저장하고, 마스터 비밀번호 하나만
          기억하면 나머지는 자동으로 관리해줍니다.
        </p>
        <p className="mb-4 leading-relaxed">
          비밀번호 관리자를 사용하면 각 사이트마다 완전히 다른 무작위 비밀번호를 사용할 수 있고,
          자동 완성 기능으로 편리하게 로그인할 수 있습니다. 오픈소스인 Bitwarden은 무료로 사용할 수 있어 추천합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">내 비밀번호가 유출됐는지 확인하는 법</h2>
        <p className="mb-4 leading-relaxed">
          <a
            href="https://haveibeenpwned.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            HaveIBeenPwned.com
          </a>
          에서 이메일 주소를 입력하면 내 계정 정보가 알려진 데이터 유출 사고에 포함됐는지 확인할 수 있습니다.
          유출된 계정이 있다면 즉시 해당 서비스의 비밀번호를 변경하고, 동일한 비밀번호를 다른 곳에서 사용했다면
          모두 바꿔야 합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">자주 묻는 질문</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">비밀번호를 얼마나 자주 바꿔야 하나요?</h3>
        <p className="mb-4 leading-relaxed">
          과거에는 정기적인 교체를 권장했지만, 최근 보안 전문가들은 &quot;유출이 의심될 때&quot; 또는 &quot;3~6개월마다&quot; 변경을
          권장합니다. 너무 자주 바꾸면 오히려 간단한 비밀번호를 쓰게 되는 역효과가 있습니다.
          중요한 것은 각 사이트마다 다른 강력한 비밀번호를 쓰고 2단계 인증을 활성화하는 것입니다.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">브라우저의 비밀번호 저장 기능을 써도 되나요?</h3>
        <p className="mb-4 leading-relaxed">
          Chrome, Firefox, Safari의 비밀번호 저장 기능도 상당히 안전합니다. 하지만 기기를 분실하거나
          다른 사람이 브라우저에 접근할 수 있는 환경이라면 주의가 필요합니다.
          전용 비밀번호 관리자는 기기 간 동기화, 더 강력한 암호화, 보안 감사 기능 등을 제공해 더 안전합니다.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <Link
          href="/nickname/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          PickPlay 비밀번호 생성기 →
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          클릭 한 번으로 안전한 무작위 비밀번호를 생성해보세요.
        </p>
      </div>
    </article>
  );
}
