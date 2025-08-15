import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/Home.css';
import Spline from '@splinetool/react-spline';
import { Icon } from '@iconify/react';

function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Ẩn welcome message sau 3 giây
    const timer = setTimeout(() => {
      setShowWelcome(false);
      // Force reflow and re-observe sections after welcome overlay hides
      setTimeout(() => {
        const sections = document.querySelectorAll('.home-section');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          { threshold: 0.1 }
        );
        sections.forEach((section) => observer.observe(section));
      }, 100); // Small delay to ensure DOM is updated
    }, 3000);

    return () => {
      clearTimeout(timer); // Dọn dẹp timer
    };
  }, []);

  const features = [
    {
      title: 'Quản lý sản phẩm',
      description: 'Quản lý sản phẩm và danh mục với các endpoint linh hoạt: Thêm, chỉnh sửa, xóa sản phẩm, tùy chỉnh thuộc tính (thành phần tự nhiên, nguồn gốc, công dụng).',
      link: '#products',
    },
    {
      title: 'Quản lý danh mục',
      description: 'Tổ chức sản phẩm theo danh mục: Tạo, chỉnh sửa, xóa danh mục, hỗ trợ phân loại theo loại mỹ phẩm hoặc đặc tính.',
      link: '#category',
    },
    {
      title: 'Xác thực Google',
      description: 'Hỗ trợ đăng nhập bằng Google: Tích hợp xác thực Google OAuth, đảm bảo đăng nhập nhanh chóng và bảo mật.',
      link: '#googleauth',
    },
    {
      title: 'Quản lý thương hiệu',
      description: 'Quản lý thông tin thương hiệu: Thêm, cập nhật, xóa thương hiệu, liên kết với sản phẩm để tăng độ nhận diện.',
      link: '#brand',
    },
    {
      title: 'Quản lý giỏ hàng',
      description: 'Quản lý giỏ hàng, đơn hàng, và thanh toán: Giỏ hàng lưu tạm, theo dõi trạng thái đơn hàng, tích hợp nhiều phương thức thanh toán.',
      link: '#cart',
    },
    {
      title: 'Quản lý bình luận',
      description: 'Quản lý đánh giá và bình luận sản phẩm: Khách hàng để lại nhận xét, phản hồi, hiển thị trên trang sản phẩm.',
      link: '#comment',
    },
    {
      title: 'Quản lý mã giảm giá',
      description: 'Tạo và quản lý mã giảm giá: Hỗ trợ chiến dịch giảm giá theo thời gian hoặc khách hàng cụ thể, theo dõi hiệu quả.',
      link: '#coupon',
    },
    {
      title: 'Tích hợp MB Bank',
      description: 'Tích hợp với MB Bank: Theo dõi giao dịch thời gian thực, báo cáo chi tiết, mở rộng với các ngân hàng khác.',
      link: '#mbbank',
    },
    {
      title: 'Thanh toán VNPay',
      description: 'Tích hợp thanh toán VNPay: Hỗ trợ thanh toán nhanh, an toàn, và theo dõi giao dịch qua VNPay.',
      link: '#vnpay',
    },
  ];

  const techItems = [
    { name: 'JS', icon: 'logos:javascript' },
    { name: 'TS', icon: 'logos:typescript-icon' },
    { name: 'HTML5', icon: 'logos:html-5' },
    { name: 'CSS3', icon: 'logos:css-3' },
    { name: 'Git', icon: 'logos:git-icon' },
    { name: 'Node.js', icon: 'logos:nodejs-icon' },
    { name: 'Mongo', icon: 'logos:mongodb-icon' },
    { name: 'Postman', icon: 'logos:postman' },
    { name: 'GitHub', icon: 'logos:github-icon' },
    { name: 'NPM', icon: 'logos:npm-icon' },
    { name: 'React', icon: 'logos:react' },
    { name: 'Next.js', icon: 'logos:nextjs' },
  ];

  return (
    <div className="api-home">
      {showWelcome ? (
        <div className="welcome-overlay">
          <h1 className="welcome-text">
            Chào mừng đến với tài liệu API by Zeal Team
          </h1>
        </div>
      ) : (
        <>
          <div className="spline-banner-wrapper">
            <Spline scene="https://prod.spline.design/RpX3HCpqKXiHUuTU/scene.splinecode" />
            <NavLink className="overlay-button" to="/apis">Xem Api Ngay</NavLink>
            <div className="tech-container">
              <div className="tech-slider">
                {[...techItems, ...techItems].map((item, index) => (
                  <div key={index} className={`tech-item ${item.name.toLowerCase().replace('.', '')}`}>
                    <Icon icon={item.icon} width="40" height="40" inline />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <h2 className="section-title">Giới thiệu</h2>
            <div className="intro-text-wrapper">
              <p className="intro-text1">
                Website tài liệu API dự án shop bán đồ mỹ phẩm by Zeal Team
              </p>
            </div>
            <p className="intro-text2">
              Website cung cấp các api mạnh mẽ để quản lý sản phẩm, danh mục, đơn hàng, và nhiều tính năng khác cho nền tảng bán mỹ phẩm thiên nhiên. Với thiết kế RESTful, API của chúng tôi dễ sử dụng, bảo mật, và hỗ trợ tích hợp nhanh chóng vào website của bạn.
            </p>
          </div>

          <section className="home-section home-features">
            <h2 className="section-title">Các tính năng chính</h2>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <a
                  href={feature.link}
                  key={feature.link}
                  className="feature-card"
                >
                  <div className="feature-card-inner">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                    <div className="feature-hover-bg"></div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;